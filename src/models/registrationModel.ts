import { Schema, model } from "mongoose";
import { registrationTypes } from "types/registrationTypes.js";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const registrationSchema = new Schema<registrationTypes>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    required: true,
    default: uuid,
  },
});

const registrationModel = model("registrationModel", registrationSchema);

export default registrationModel;
