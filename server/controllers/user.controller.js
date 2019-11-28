exports.dashboard = (req, res) => {
  console.log(req.user);
  res.send('Dashboard Page');
}
exports.profile = (req, res) => {
  res.send('Profile Page');
}
