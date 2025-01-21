import apiClient from "./api-client";

export const uploadImg = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    console.log("uploadImg");
    console.log(file);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      apiClient.post('http://localhost:3003/file/file?file=123.jpeg', formData, {
        headers: {
          'Content-Type': 'image/jpeg'
        }
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
        resolve(res.data.url);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    }
  });
};
