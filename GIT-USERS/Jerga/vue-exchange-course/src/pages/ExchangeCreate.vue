<template>
  <div class="container base-page">
    <div class="form-container">
      <h1>Create Exchange</h1>
      <form>
        <div class="field">
          <label class="label">Type</label>
          <div class="control">
            <div class="select">
              <select v-model="form.type">
                <option value="service">Service</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              @blur="$v.form.title.$touch"
              v-model="form.title"
              class="input"
              type="text"
              placeholder="Some Nice Product"
            />
            <div v-if="$v.form.title.$error" class="form-error">
              <span v-if="!$v.form.title.required" class="help is-danger"
                >Title is required</span
              >
              <span v-if="!$v.form.title.minLength" class="help is-danger"
                >Minimum length of title is 10 characters!</span
              >
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
              @blur="$v.form.description.$touch"
              v-model="form.description"
              class="textarea"
              placeholder="Some catchy description about product"
            >
            </textarea>
            <div v-if="$v.form.description.$error" class="form-error">
              <span v-if="!$v.form.description.required" class="help is-danger"
                >Description is required</span
              >
            </div>
          </div>
        </div>
        <!-- IMAGE -->
        <div class="field">
          <el-upload
            :action="''"
            class="upload-demo"
            :on-progress="handleProgress"
            :limit="1"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </el-upload>
        </div>
        <img class="image-preview" v-if="form.image" :src="form.image" />
        <!-- TODO: Rename To Price -->
        <div class="field">
          <label class="label">Price</label>
          <div class="control">
            <input
              @blur="$v.form.price.$touch"
              v-model="form.price"
              class="input"
              type="number"
              placeholder="249"
            />
            <div v-if="$v.form.price.$error" class="form-error">
              <span v-if="!$v.form.price.required" class="help is-danger"
                >Price is required</span
              >
              <span v-if="!$v.form.price.minValue" class="help is-danger"
                >Minum price is 10$</span
              >
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Country</label>
          <div class="control">
            <input
              @blur="$v.form.country.$touch"
              v-model="form.country"
              class="input"
              type="text"
              placeholder="Slovakia"
            />
            <div v-if="$v.form.country.$error" class="form-error">
              <span v-if="!$v.form.country.required" class="help is-danger"
                >Country is required</span
              >
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input
              @blur="$v.form.city.$touch"
              v-model="form.city"
              class="input"
              type="text"
              placeholder="Bratislava"
            />
            <div v-if="$v.form.city.$error" class="form-error">
              <span v-if="!$v.form.city.required" class="help is-danger"
                >City is required</span
              >
            </div>
          </div>
        </div>

        <!-- TODO: provide tags inputs -->
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <input
              @input="handleTags"
              class="input"
              type="text"
              placeholder="programming"
            />
            <div
              v-for="tag in form.tags"
              :key="`t-${tag}`"
              class="tag is-primary is-medium"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              :disabled="!isFormValid"
              @click.prevent="createExchange"
              class="button is-link"
            >
              Submit
            </button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength, url, minValue } from "vuelidate/lib/validators";
import { supportedFileType } from "@/helpers/validators";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        type: "service",
        image: "",
        price: null,
        country: "",
        city: "",
        tags: [],
      },
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(10),
      },
      description: {
        required,
      },
      image: {
        url,
      },
      price: {
        required,
        minValue: minValue(10),
      },
      country: {
        required,
      },
      city: {
        required,
      },
    },
  },
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid && this.form.image;
    },
  },
  methods: {
    createExchange() {
      this.$v.form.$touch();

      if (this.isFormValid) {
        this.$store
          .dispatch("exchange/createExchange", { ...this.form })
          .then((_) => {
            // Or any other page, for example Home Page
            this.$router.push({ name: "ProfilePage" });
          })
          .catch((e) => console.error(e.message));
      }
    },
    handleTags(e) {
      const { value } = e.target;

      if (
        value &&
        value.trim().length > 1 &&
        (value.substr(-1) === "," || value.substr(-1) === " ")
      ) {
        this.form.tags.push(value.split(",")[0]);
        e.target.value = "";
      }
    },
    handleProgress(event, file) {
      if (file && file.status === "ready") {
        this.$store
          .dispatch("exchange/uploadImage", file.raw)
          .then((imageUrl) => {
            this.form.image = imageUrl;
          });
      }
    },
  },
};
</script>

<style>
.form-container {
  max-width: 960px;
  margin: 0 auto;
}

.image-preview {
  height: 200px;
}

.tag {
  margin: 3px;
}
</style>
