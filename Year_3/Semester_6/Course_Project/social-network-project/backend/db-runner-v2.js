require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");

// Колекцията за потребителя
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
// Колекцията за приятелствата
const FriendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    friend: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
// Колекцията за публикациите
const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    location: { type: String },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
// Колекцията за коментарите
const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    createdAt: { type: Date, default: Date.now },   
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Създаваме индекси за оптимизация на заявките
UserSchema.index({ username: 1 });
FriendSchema.index({ user: 1, friend: 1 });
PostSchema.index({ createdAt: -1 }, {location: "text"});        
CommentSchema.index({ createdAt: -1 });

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const Friend = mongoose.model("Friend", FriendSchema);

const app = express();
app.use(express.json());
app.use(cors());

// Пускаме сървъра за връзка с MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Успешна връзка с MongoDB!");
        app.listen(3000, () => console.log("Сървърът работи на порт 3000"));
    })
    .catch((err) => console.error("Грешка при свързване:", err));

// Раут за тестване на API-то
app.get("/", (req, res) => {
    res.json({ message: "API работи успешно!" });
});

// Раут за регистрация на потребител
app.post("/api/users/register", async (req, res) => {
    try {
        // Вземаме данните от заявката
        const { firstName, lastName, email, password } = req.body;


        // Проверяваме дали вече съществува потребител с този имейл, който сме взели от заявката
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Вече съществува потребител с този имейл!" });
        }

        // Хешираме паролата, която сме взели от заявката, преди да я запишем в базата данни
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Създаваме нов потребител с данните от заявката и хешираната парола
        const newUser = new User({
            username: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        });

        // Запазваме новия потребител в базата данни и връщаме отговор с успех
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Потребителят е регистриран успешно!", userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при регистрация!" });
    }
});

// Раут за вход на потребител
app.post("/api/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверяваме дали съществува потребител с този имейл, който сме взели от заявката
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Потребител с този имейл не съществува!" });
        }

        // Сравняваме паролата от заявката с хешираната парола в базата данни
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Грешна парола!" });
        }

        // Ако всичко е наред, връщаме отговор с успех и информация за потребителя
        res.json({ message: "Успешен вход!", userId: user._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при вход!" });
    }
});

// Раут за проверка на потребителския профил
app.get("/api/users/:userId", async (req, res) => {
    try {
        // Вземаме ID-то на потребителя от параметрите на URL
        const { userId } = req.params;
        // Извличаме информацията за потребителя от базата данни, като изключваме паролата
        const user = await User.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(userId) } },
            { $project: { _id: 1, username: 1, email: 1 } }
        ]);
        if (!user.length) {
            return res.status(404).json({ error: "Потребителят не е намерен!" });
        }
        // Връщаме извлечената информация за потребителя като JSON отговор
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на потребителския профил!" });
    }
});

// Раут за извличане на потребителите
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                // Проектираме само полетата username и email, като изключваме паролата
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1
                },
                $sort: { username: 1 }
            }
        ]);
        // Връщаме извлечените потребители като JSON отговор
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на потребителите!" });
    }
});

// Раут за заявки за приятелство
app.post("/api/friends", async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        // Създаваме нова заявка за приятелство
        const newFriendRequest = new Friend({
            user: userId,
            friend: friendId,
            status: "pending"
        });
        // Запазваме заявката за приятелство в базата данни и връщаме отговор с успех
        const savedFriendRequest = await newFriendRequest.save();
        res.status(201).json({ message: "Заявката за приятелство е изпратена успешно!", friendRequestId: savedFriendRequest._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при изпращане на заявка за приятелство!" });
    }
});

// Раут за приемане на заявка за приятелство
app.post("/api/friends/accept", async (req, res) => {
    try {
        const { requestId } = req.body;
        // Намираме заявката за приятелство по ID и я актуализираме до "accepted"
        const updatedFriendRequest = await Friend.findByIdAndUpdate(requestId, { status: "accepted" }, { new: true });
        if (!updatedFriendRequest) {
            return res.status(404).json({ error: "Заявката за приятелство не е намерена!" });
        }
        res.json({ message: "Заявката за приятелство е приета успешно!", friendRequest: updatedFriendRequest });
    } catch (error) {
        res.status(500).json({ error: "Грешка при приемане на заявка за приятелство!" });
    }
});

// Раут за отхвърляне на заявка за приятелство
app.post("/api/friends/reject", async (req, res) => {
    try {
        const { requestId } = req.body;
        // Намираме заявката за приятелство по ID и я актуализираме до "rejected"
        const updatedFriendRequest = await Friend.findByIdAndUpdate(requestId, { status: "rejected" }, { new: true });
        if (!updatedFriendRequest) {
            return res.status(404).json({ error: "Заявката за приятелство не е намерена!" });
        }
        res.json({ message: "Заявката за приятелство е отхвърлена успешно!", friendRequest: updatedFriendRequest });
    } catch (error) {
        res.status(500).json({ error: "Грешка при отхвърляне на заявка за приятелство!" });
    }
});

// Раут за извличане на общи приятели
app.get("/api/friends/mutual", async (req, res) => {
    try {
        const { userA_id, userB_id } = req.query;

        // ВАЖНО: При агрегация трябва ръчно да превърнем стринговете в ObjectId!
        const objIdA = new mongoose.Types.ObjectId(userA_id);
        const objIdB = new mongoose.Types.ObjectId(userB_id);

        const mutualFriends = await Friend.aggregate([
            {
                // Вземаме всички записи за приятелство, където статусът е "accepted" и включват или A, или B
                $match: {
                    status: "accepted",
                    $or: [
                        { user: objIdA }, { friend: objIdA },
                        { user: objIdB }, { friend: objIdB }
                    ]
                }
            },
            {
                // Проектираме "третия човек" от всяко приятелство, който не е нито A, нито B
                $project: {
                    thirdPersonId: {
                        $cond: {
                            if: { $in: ["$user", [objIdA, objIdB]] },
                            then: "$friend",
                            else: "$user"
                        }
                    }
                }
            },
            {
                // Групираме по "третия човек" и броим колко пъти се среща (трябва да е 2, за да е общ приятел на A и B)
                $group: {
                    _id: "$thirdPersonId",
                    count: { $sum: 1 }
                }
            }, 
            {
                // Филтрираме само тези, които са общи приятели и не са само A или B
                $match: {
                    count: 2,
                    _id: { $nin: [objIdA, objIdB] } // Гарантираме, че A и B не излизат като общи приятели сами на себе си
                }
            }, 
            {
                // Вземаме информацията за общия приятел от колекцията "users"
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "friendDetails"
                }
            }, 
            // Разгъваме масива с информация за приятеля, за да имаме директен достъп до полетата му
            { $unwind: "$friendDetails" }, 
            {
                // Форматираме крайния изглед, като включваме ID-то и потребителското име на общия приятел
                $project: {
                    _id: 0,
                    mutualFriendId: "$_id",
                    username: "$friendDetails.username"
                }
            }
        ]);
        
        res.json(mutualFriends); 
    } catch (error) {
        console.error("Грешка при извличане на общи приятели:", error);
        res.status(500).json({ error: "Грешка при извличане на общи приятели!" });
    }
});

// Раут за създаване на публикация
app.post("/api/posts", async (req, res) => {
    try {
        const { content, authorId } = req.body;

        // Създаваме нова публикация с данните от заявката
        const newPost = new Post({
            content,
            likes: 0,
            author: authorId
        });

        // Запазваме новата публикация в базата данни и връщаме отговор с успех
        const savedPost = await newPost.save();
        res.status(201).json({ message: "Публикацията е създадена успешно!", postId: savedPost._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при създаване на публикация!" });
    }
});

// console.log(Post);

// Раут за извличане на публикации
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { createdAt: -1 } },
            {
                // Вземаме данните за автора на публикацията
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo"
                }
            }, 
            // Разгъваме масива с информация за автора, за да имаме директен достъп до полетата му
            { $unwind: "$authorInfo" },
            {
                // Форматираме крайния изглед на публикацията, като включваме съдържанието, броя на лайковете, локацията, датата на създаване и информация за автора
                $project: {
                    content: 1,
                    likes: 1,
                    location: 1,
                    createdAt: 1,
                    "authorInfo._id": 1,
                    "authorInfo.username": 1
                }
            }
        ]);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Грешка при агрегация на фийда:", error);
        res.status(500).json({ error: "Грешка при извличане на публикации!" });
    }
});

// Раут за извличане на trending публикации
app.get("/api/posts/trending", async (req, res) => {
    try {
        const trendingPosts = await Post.aggregate([
            // Вземаме коментарите за всеки пост
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "postComments"
                }
            },
            // Вземаме данните за автора
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo"
                }
            },
            { $unwind: "$authorInfo" },
            // Пресмятаме Trending Score (лайкове + брой коментари)
            {
                $addFields: {
                    trendingScore: { $add: ["$likes", { $size: "$postComments" }] }
                }
            },
            // Сортираме по новия резултат
            { $sort: { trendingScore: -1, createdAt: -1 } },
            {
                // Форматираме крайния изглед
                $project: {
                    content: 1,
                    likes: 1,
                    commentsCount: 1,
                    trendingScore: 1,
                    location: 1,
                    "authorInfo._id": 1,
                    "authorInfo.username": 1
                }
            }
        ]);
        res.json(trendingPosts);
    } catch (error) {
        console.error("Грешка при Trending:", error);
        res.status(500).json({ error: "Грешка при извличане на trending публикации!" });
    }
});

// Раут за писане на коментар
app.post("/api/posts/:postId/comments", async (req, res) => {
    try {
        // Вземаме данните от заявката и параметрите от URL
        const { content, authorId } = req.body;
        // Вземаме ID-то на публикацията от параметрите на URL
        const { postId } = req.params;
        // Създаваме нов коментар с данните от заявката и връзка към публикацията
        const newComment = new Comment({
            content,
            author: authorId,
            post: postId
        });

        // Запазваме новия коментар в базата данни и връщаме отговор с успех
        const savedComment = await newComment.save();
        res.status(201).json({ message: "Коментарът е добавен успешно!", commentId: savedComment._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при добавяне на коментар!" });
    }
});

// Раут за извличане на коментари към публикация
app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
        // Вземаме ID-то на публикацията от параметрите на URL
        const { postId } = req.params;
        // Извличаме всички коментари, които са свързани с тази публикация
        const comments = await Comment.aggregate([
            { $match: { post: mongoose.Types.ObjectId(postId) } },
            {
                // Вземаме данните за автора на всеки коментар
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo"
                }
            },
            { $unwind: "$authorInfo" },
            {
                // Форматираме крайния изглед на коментара, като включваме съдържанието, датата на създаване и информация за автора
                $project: {
                    content: 1,
                    createdAt: 1,
                    "authorInfo._id": 1,
                    "authorInfo.username": 1
                }
            }
        ]);

        // Връщаме извлечените коментари като JSON отговор
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на коментари!" });
    }
});

// Създаваме клъстер от тестови данни
async function seedDatabase() {
    try {
        console.log("Изчистване на старата база данни...");
        await Promise.all([
            User.deleteMany({}), Post.deleteMany({}),
            Comment.deleteMany({}), Friend.deleteMany({})
        ]);

        console.log("Генериране на 1000 потребителя...");
        // Хешираме само веднъж за максимална скорост
        const salt = await bcrypt.genSalt(10);
        const commonPassword = bcrypt.hashSync("password123", salt);

        const usersData = Array.from({ length: 1000 }).map((_, i) => ({
            username: `user_${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: commonPassword
        }));
        const users = await User.insertMany(usersData);
        console.log("1000 потребителя създадени!");

        console.log("Генериране на 10 000 публикации (Това може да отнеме няколко секунди)...");
        const locations = ["София", "Пловдив", "Варна", "Бургас", "Русе"];
        let postsData = [];
        
        for (let i = 0; i < 10000; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            // Генерираме случайни дати в миналото, за да тестваме хронологичното сортиране
            const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
            
            postsData.push({
                content: `Това е масова публикация номер ${i + 1} за профилиране на базата.`,
                author: randomUser._id,
                location: locations[i % locations.length],
                likes: Math.floor(Math.random() * 100),
                createdAt: randomDate
            });
        }
        
        await Post.insertMany(postsData);
        console.log("10 000 публикации създадени!");

        // Генерираме 20 000 коментара, като ги разпределяме произволно между публикациите и потребителите
        console.log("Генериране на 20 000 коментара...");
        const posts = await Post.find({}, { _id: 1 });
        let commentsData = [];

        for (let i = 0; i < 20000; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
            commentsData.push({
                content: `Това е масов коментар номер ${i + 1} за профилиране на базата.`,
                author: randomUser._id,
                post: randomPost._id,
                createdAt: randomDate
            });
        }

        await Comment.insertMany(commentsData);
        console.log("20 000 коментара създадени!");

        // Генерираме 5000 заявки за приятелство, като ги разпределяме произволно между потребителите
        console.log("Генериране на 5000 заявки за приятелство...");
        let friendsData = [];
        const userIds = users.map(u => u._id);

        for (let i = 0; i < 5000; i++) {
            const userA = userIds[Math.floor(Math.random() * userIds.length)];
            let userB = userIds[Math.floor(Math.random() * userIds.length)];
            // Гарантираме, че не се генерират заявки за приятелство между един и същ потребител
            while (userB.equals(userA)) {
                userB = userIds[Math.floor(Math.random() * userIds.length)];
            }
            friendsData.push({
                user: userA,
                friend: userB,
                status: "accepted",
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
            });
        }

        await Friend.insertMany(friendsData);

        console.log("Базата е готова!");
    } catch (error) {
        console.error("Грешка при сийдване:", error);
    }
}

seedDatabase();

// Раутове за тестване на explain()
app.get("/api/test-explain-post-1", async (req, res) => {
    try {
        // Симулираме реално извличане на фийд: Сортиране по дата и вземане на първите 20
        const explainResult = await Post.find()
            .sort({ createdAt: -1 })
            .limit(20)
            .explain("executionStats");
            
        res.json(explainResult);
    } catch (error) {
        res.status(500).json({ error: "Грешка при изпълнение на explain()!" });
    }
});
app.get("/api/test-explain-post-2", async (req, res) => {
    try {
        const explainResult = await Post.find()
            .sort({ createdAt: -1 })
            .limit(783)
            .explain("executionStats");
            
        res.json(explainResult);
    } catch (error) {
        res.status(500).json({ error: "Грешка при изпълнение на explain()!" });
    }
});
app.get("/api/test-explain-post-3", async (req, res) => {
    try {
        const explainResult = await Post.find()
            .sort({ createdAt: -1 })
            .limit(5783)
            .explain("executionStats");
            
        res.json(explainResult);
    } catch (error) {
        res.status(500).json({ error: "Грешка при изпълнение на explain()!" });
    }
});