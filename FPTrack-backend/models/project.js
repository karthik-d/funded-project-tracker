/* A `proposal` becomes a `project` when it is approved */

var mongoose = require("mongoose");
var Promise = require("promise");

var Schema = mongoose.Schema;

// Child schema
var UpdatesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      created_at: "created_at",
      modified_at: "modified_at",
    },
  }
);

// Child schema
var OutcomesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    kind: {
      type: String,
      enum: ["research_paper", "patent", "incubation", "scaled", "other"],
      required: true,
    },
    // URL to publication, patent, etc.
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      created_at: "created_at",
      modified_at: "modified_at",
    },
  }
);

// Valiations to consider:
// - Allow resources ONLY for Internal Projects
// - (add on...)
var ProjectSchema = new Schema(
  {
    proposal: {
      type: Schema.Types.ObjectId,
      ref: "proposal",
      required: true,
    },
    status_updates: {
      type: [
        {
          type: UpdatesSchema,
        },
      ],
      default: () => [],
    },
    outcomes: {
      type: [
        {
          type: OutcomesSchema,
        },
      ],
      default: () => [],
    },
    approved_budget: {
      type: Number,
      required: true,
    },
    approved_duration: {
      type: Number, // in MONTHS
      required: true,
    },
    completed_on: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      created_at: "created_at",
      modified_at: "modified_at",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//--

ProjectSchema.statics.onlyExisting = function () {
  return this.find().onlyExisting();
};

ProjectSchema.query.onlyExisting = function () {
  return this.find({
    deleted_at: null,
  });
};

//--

ProjectSchema.statics.getById = function (id) {
  return this.find().getById(id);
};

ProjectSchema.query.getById = function (id) {
  return this.find({
    _id: id,
  });
};

//--

ProjectSchema.methods.getMostRecentUpdate = function () {
  if (this.status_updates.length > 0) {
    return this.status_updates.reduce((prev_update, current_update) => {
      return prev_update.created_at >= current_update.created_at
        ? prev_update
        : current_update;
    });
  } else {
    return null;
  }
};

//--

ProjectSchema.methods.getMostRecentOutcome = function () {
  if (this.outcomes.length > 0) {
    return this.outcomes.reduce((prev_outcome, current_outcome) => {
      return prev_outcome.created_at >= current_outcome.created_at
        ? prev_outcome
        : current_outcome;
    });
  } else {
    return null;
  }
};

//--

// virtual for URL
ProjectSchema.virtual("url").get(function () {
  return "/api/project/" + this._id;
});

module.exports = mongoose.model("project", ProjectSchema);
