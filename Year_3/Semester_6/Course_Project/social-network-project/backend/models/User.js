const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Пазим приятелите като масив от референции към други потребители
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
}, { timestamps: true });

// Извличане на фийд с публикации (Aggregation Pipeline)
app.get('/api/users/:userId/feed', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    const feedPipeline = [
      // 1. Намираме всички публикации на приятелите на потребителя
      { $match: { author: { $in: user.friends } } },
      // 2. Сортираме от най-нови към най-стари
      { $sort: { createdAt: -1 } },
      // 3. Лимитираме до 20 публикации (Пагинация)
      { $limit: 20 },
      // 4. Присъединяваме данните за автора (JOIN еквивалент)
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      // 5. Разгъваме масива с детайли за автора
      { $unwind: '$authorDetails' }
    ];

    const feed = await Post.aggregate(feedPipeline);
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при генериране на фийда' });
  }
});

module.exports = mongoose.model('User', UserSchema);