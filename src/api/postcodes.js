import axios from "axios";

const client = axios.create({
  baseURL: "https://api.postcodes.io/",
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then((req) => {
      return req.data;
    });
  },
  getPostCode(postCode) {
    return this.execute(
      "get",
      `postcodes/${postCode}`
    );
  },
};
