import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { firestore } from "../../firebase";
import Header, { User } from "../mint/header";
import AvatarUpload from "../../components/ui/avatarUpload";
import styles from "./Setting.module.scss";
import Footer from "../../components/footer";
import { pinFileToIPFS } from "../../utils/pinataAPI";

function Setting(this: any) {
  const { active, account } = useWeb3React();
  const [user, setUser] = useState<any>({
    account,
    avatar: "assets/img/avatars/avatar.jpg",
    firstName: "User",
    lastName: "",
    nickName: "@user",
    bio: ""
  });
  const [bioLength, setBioLength] = useState(0);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | Blob | null>(null);
  const [errors, setErrors] = useState<object>({});
  const [buffer, setBuffer] = useState<string | ArrayBuffer | null>(null);
  const [imageType, setImageType] = useState<string>('image');
  const [avatarImage, setAvatarImage] = useState<File | Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bufferAvatar, setBufferAvatar] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [overLength, setOverLength] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');

  const handleBio = (e: any) => {
    if (e.target.value.length > 300) {
      setOverLength(true);
    } else {
      setOverLength(false);
      setBio(e.target.value);
      setBioLength(e.target.value.length);
    }
  }

  // const assetUpload = async () => {
  //   const imageUrls = [];
  //   let avatar = await fetch('img/asset/1.jpg').then((r) =>
  //     r.blob(),
  //   );
  //   let pinataData = await pinFileToIPFS(avatar);
  //   imageUrls.push(pinataData.imageUrl);
  //   avatar = await fetch('img/asset/2.jpg').then((r) =>
  //     r.blob(),
  //   );
  //   pinataData = await pinFileToIPFS(avatar);
  //   imageUrls.push(pinataData.imageUrl);
  //   avatar = await fetch('img/asset/3.jpg').then((r) =>
  //     r.blob(),
  //   );
  //   pinataData = await pinFileToIPFS(avatar);
  //   imageUrls.push(pinataData.imageUrl);
  //   avatar = await fetch('img/asset/4.jpg').then((r) =>
  //     r.blob(),
  //   );
  //   pinataData = await pinFileToIPFS(avatar);
  //   imageUrls.push(pinataData.imageUrl);
  //   avatar = await fetch('img/asset/5.jpg').then((r) =>
  //     r.blob(),
  //   );
  //   pinataData = await pinFileToIPFS(avatar);
  //   imageUrls.push(pinataData.imageUrl);
  //   const res = firestore.collection("assetImages").doc("assetImages").set({ imageUrls });
  // }

  // useEffect(() => {
  //   assetUpload();
  // }, []);

  const getUser = async (userId: any) => {
    if (userId) {
      const userInfo = (
        await firestore.collection("users").doc(userId).get()
      ).data();
      if (userInfo) {
        if (userInfo.avatarImage) {
          const avatar = await fetch(userInfo.avatarImage).then((r) =>
            r.blob(),
          );
          setAvatarUrl(userInfo.avatarImage);
          setAvatarImage(avatar);
        }
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setNickName(userInfo.nickName.substring(1));
        setBio(userInfo.bio);
      } else if (active) {
        toast.info("Please fill your profile.");
      }
    }
  };
  useEffect(() => {
    getUser(account);
  }, [account]);

  const onAddAvatar = (item: File | Blob) => {
    if (item) setImageType(item.type.split('/')[0]);
    setErrors((prev) => ({
      ...prev,
      image: '',
    }));
    setAvatarImage(item);
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      setBufferAvatar(binaryStr);
    };
    reader.readAsArrayBuffer(item);
  };

  const deleteAvatar = () => {
    const reader = new FileReader();
    reader.abort();
    setAvatarImage(null);
    setAvatarUrl(null);
    setBufferAvatar(null);
  };

  const saveData = async () => {
    if (!firstName || !lastName) {
      toast.error('Please fill the First Name and Last Name');
      return;
    }
    if (!nickName) {
      toast.error('Please fill the Nickname');
      return;
    }
    if (!bio) {
      toast.error('Please fill the Bio');
      return;
    }
    if (active) {
      try {
        let imageAvatar: string | null = avatarUrl;
        setIsProcessing(true);
        if (bufferAvatar && avatarImage) {
          const pinataData = await pinFileToIPFS(avatarImage);
          if (pinataData.success) {
            imageAvatar = pinataData.imageUrl;
            setAvatarUrl(imageAvatar);
          } else {
            toast.error('Failed to upload cover image.');
            setIsProcessing(false);
            return;
          }
        }

        const payload = {
          account,
          firstName,
          lastName,
          nickName: `@${nickName}`,
          avatarImage: imageAvatar,
          bio,
        };
        if (account) {
          const userInfo = await firestore.collection("users").doc(account).set(payload);
        }
        setIsProcessing(false);
        toast.success('successed profile');
        // router.push(`/users/${user?.id}`);
      } catch (err) {
        console.log(err);
        toast.error('Failed to update profile');
        setIsProcessing(false);
      }
    }
  }

  return (
    <div className="mint-bg flex flex-col justify-center">
      <Header />
      <div className={styles.upload}>
        <AvatarUpload
          imageType={imageType}
          image={avatarImage}
          setAvatar={onAddAvatar}
          deleteAvatar={deleteAvatar}
        />
      </div>
      <div className={styles.form}>
        <div className="flex flex-col md:flex-row">
          <div className="flex">
            <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3">First Name *</span>
            <input type="string"
              className={styles.input}
              placeholder="First Name"
              max={15}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3">Last Name *</span>
            <input type="string"
              className={styles.input}
              placeholder="Last Name"
              max={15}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="flex">
            <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3">Nickname *</span>
            <input type="string"
              className={styles.input}
              placeholder="Nickname"
              max={15}
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.bioContainer}>
          <span className="flex text-white items-center bg-grey-lighter rounded rounded-r-none px-3">Bio *</span>
          <textarea
            placeholder="Tell about yourself in a few words"
            value={bio}
            onChange={(e) => handleBio(e)}
            className={styles.bio}
          />
          <p className={`text-right text-white ${overLength ? 'text-red-400' : ''}`}>{bioLength}/300</p>
        </div>
        <button type="button" disabled={isProcessing} className={styles.saveBtn} onClick={() => saveData()}>
          {isProcessing ? 'Saving...' : 'Save'}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;