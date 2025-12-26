export const updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const {
        name,
        avatar,
        dietPreference,
        allergies,
        goals,
        dailyCalorieTarget,
      } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        {
          name,
          avatar,
          dietPreference,
          allergies,
          goals,
          dailyCalorieTarget,
        },
        { new: true }
      );
  
      res.json({ user });
    } catch (err) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  };
  