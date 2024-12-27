const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  minedPoints: {
    type: Number,
    default: 0,
  },
  activityLog: {
    type: Array,
    default: [], // Default empty array for activity logs
  },
  notifications: {
    type: Array,
    default: [], // Default empty array for notifications
  },
  preferences: {
    type: Object,
    default: {
      referralBonus: 0,
      referralsMade: 0,
      todaysEarnings: 0,
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
