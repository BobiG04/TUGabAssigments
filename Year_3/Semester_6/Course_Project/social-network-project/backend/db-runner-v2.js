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
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
// Колекцията за публикациите
const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
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

PostSchema.index({ createdAt: -1 });

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

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

// Рут за тестване на API-то
app.get("/", (req, res) => {
    res.json({ message: "API работи успешно!" });
});

// Рут за регистрация на потребител
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

// Рут за вход на потребител
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

// Рут за проверка на потребителския профил
app.get("/api/users/:userId", async (req, res) => {
    try {
        // Вземаме ID-то на потребителя от параметрите на URL
        const { userId } = req.params;
        // Извличаме информацията за потребителя от базата данни, като изключваме паролата
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "Потребителят не е намерен!" });
        }
        // Връщаме извлечената информация за потребителя като JSON отговор
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на потребителския профил!" });
    }
});

// Рут за създаване на публикация
app.post("/api/posts", async (req, res) => {
    try {
        const { content, authorId } = req.body;

        // Създаваме нова публикация с данните от заявката
        const newPost = new Post({
            content,
            likes: [],
            author: authorId
        });

        // Запазваме новата публикация в базата данни и връщаме отговор с успех
        const savedPost = await newPost.save();
        res.status(201).json({ message: "Публикацията е създадена успешно!", postId: savedPost._id });
    } catch (error) {
        res.status(500).json({ error: "Грешка при създаване на публикация!" });
    }
});


// Рут за извличане на публикации
app.get("/api/posts", async (req, res) => {
    try {
        // Извличаме всички публикации от базата данни
        const posts = await Post.find()

            // Използваме .populate, за да включим информация за автора на всяка публикация
            .populate("author", "username email")
            // Сортираме публикациите по дата на създаване в низходящ ред, за да показваме най-новите първо
            .sort({ createdAt: -1 });
        
        // Връщаме извлечените публикации като JSON отговор
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на публикации!" });
    }
});

// Рут за извличане на trending публикации (най-лайкваните)
app.get("/api/posts/trending", async (req, res) => {
    try {
        // Извличаме публикациите от базата данни и ги сортираме по брой лайкове в низходящ ред
        const trendingPosts = await Post.find()
            // Използваме .populate, за да включим информация за автора на всяка публикация
            .populate("author", "username email")
            .sort({ likes: -1, createdAt: -1 }); // Първо по брой лайкове, после по дата
        res.json(trendingPosts);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на trending публикации!" });
    }
});


// Рут за писане на коментар
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

// Рут за извличане на коментари към публикация
app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
        // Вземаме ID-то на публикацията от параметрите на URL
        const { postId } = req.params;
        // Извличаме всички коментари, които са свързани с тази публикация
        const comments = await Comment.find({ post: postId })
            // Използваме .populate, за да включим информация за автора на всеки коментар
            .populate("author", "username email");
        
        // Връщаме извлечените коментари като JSON отговор
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Грешка при извличане на коментари!" });
    }
});

// Създаваме клъстер от тестови данни
async function seedDatabase() {
    try {
        // Изчистваме старите данни
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        // Хешираме паролите за тестовите потребители
        const salt = await bcrypt.genSalt(10);
        const hashedPassword1 = await bcrypt.hash("password123", salt);
        const hashedPassword2 = await bcrypt.hash("password123", salt);

        // Създаваме потребители
        const user1 = await User.create({ username: "ivan_ivanov", email: "ivan.ivanov@example.com", password: hashedPassword1 });
        const user2 = await User.create({ username: "petar_petkov", email: "petar.petkov@example.com", password: hashedPassword2 });

        // Създаваме публикации
        const post1 = await Post.create({ content: "Здравейте, това е моята първа публикация!", author: user1._id, likes: [user2._id] });
        const post2 = await Post.create({ content: "Радвам се да бъда част от тази социална мрежа!", author: user2._id, likes: [user1._id] });

        // Създаваме коментари
        await Comment.create({ content: " прекраснo!", author: user2._id, post: post1._id });
        await Comment.create({ content: "Браво!", author: user1._id, post: post2._id });

        console.log("Тестовите данни са създадени успешно!");
    } catch (error) {
        console.error("Грешка при създаване на тестови данни:", error);
    }
}

seedDatabase();

// Рут за тестване на explain()
app.get("/api/test-explain", async (req, res) => {
    try {
        // Използваме explain() за да видим как MongoDB изпълнява заявката за извличане на публикации
        const explainResult = await Post.find().explain("executionStats");
        res.json(explainResult);
    } catch (error) {
        res.status(500).json({ error: "Грешка при изпълнение на explain()!" });
    }
});