import axios from "axios";

require('dotenv').config();

export const pinFileToIPFS = async (file: File | Blob) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    return await axios
      .post(url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        },
      })
      .then((response) =>
      // handle response here
      ({
        success: true,
        imageUrl: `https://odineum.mypinata.cloud/ipfs/${response.data.IpfsHash}`,
      })
      )
      .catch((error) => {
        console.log(error);
        // handle error here
        return { success: false, imageUrl: '' };
      });
  } catch (err) {
    console.log(err);
    return { success: false, imageUrl: '' };
  }
};

export const mintUsingPinata = async (payload: any) => {
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const data = Object.assign(payload)

    return await axios
      .post(url, data, {
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        },
      })
      .then((response) => ({
        success: true,
        message:
          `https://odineum.mypinata.cloud/ipfs/${response.data.IpfsHash}`,
      }))
      .catch((error) => {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
};