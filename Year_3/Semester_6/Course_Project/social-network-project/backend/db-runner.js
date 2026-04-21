require('dotenv').config();
const mongoose = require('mongoose');

// 1. ДЕФИНИРАНЕ НА СХЕМИ И РЕЛАЦИИ (BSON Моделиране)

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  // ТУК Е РЕФЕРИРАНЕТО (Referencing)
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


// 2. ИНДЕКСИРАНЕ (Оптимизация на заявките)

// Създаваме низходящ индекс върху датата, за да филтрираме фийда бързо
PostSchema.index({ createdAt: -1 });

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// 3. ИЗПЪЛНЕНИЕ НА СКРИПТА

async function runDatabaseTests() {
  try {
    console.log("⏳ Свързване с MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Успешна връзка!\n");

    // Изчистваме старите тестови данни
    await User.deleteMany({});
    await Post.deleteMany({});



    console.log("Създаване на релационни данни (Seeding)");
    const testUser = await User.create({ username: 'db_master', email: 'master@tu-gabrovo.bg' });
    
    await Post.create([
      { content: 'Първи тест на нерелационната база!', author: testUser._id },
      { content: 'Втори пост, за да тестваме сортирането по индекс.', author: testUser._id }
    ]);
    console.log(`Създаден потребител (ID: ${testUser._id}) и 2 публикации към него.\n`);



    console.log("Тест на Агрегацията (.populate)");
    // Еквивалент на JOIN в SQL
    const feed = await Post.find().populate('author', 'username email').sort({ createdAt: -1 });
    console.log(JSON.stringify(feed, null, 2));
    console.log("\nДанните са успешно обединени!\n");

    console.log("Тест на Производителността (.explain)");
    // Проверяваме дали заявката ползва индекса, който създадохме
    const explainResult = await Post.find().sort({ createdAt: -1 }).explain("executionStats");
    
    console.log("Използван индекс (Stage):", explainResult.queryPlanner.winningPlan.stage);
    console.log("Сканирани документи (totalDocsExamined):", explainResult.executionStats.totalDocsExamined);
    console.log("Време за изпълнение (executionTimeMillis):", explainResult.executionStats.executionTimeMillis, "ms");
    
    if (explainResult.queryPlanner.winningPlan.stage === 'FETCH' || explainResult.queryPlanner.winningPlan.stage === 'IXSCAN') {
      console.log("\nБазата данни използва индекса (IXSCAN) за светкавично бързо сортиране!");
    }

  } catch (error) {
    console.error("Грешка:", error);
  } finally {
    // Затваряме връзката, за да приключи скриптът
    await mongoose.connection.close();
    console.log("\nВръзката с базата е затворена.");
  }
}

runDatabaseTests();