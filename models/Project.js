const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // New
  description: { type: String, required: true },
  techStack: [String],
  link: { type: String, required: true },
  image: { type: String },
});

// Auto-generate slug before saving
projectSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();

  this.slug = this.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "") // remove non-word chars
    .replace(/\-\-+/g, "-")   // collapse dashes
    .replace(/^-+|-+$/g, ""); // trim

  next();
});

module.exports = mongoose.model("Project", projectSchema);
