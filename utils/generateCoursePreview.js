export const generatePreview = (courseObj) => {
    try {
      const getRandomContentTitle = () => {
        const contents = courseObj.contents;
        const nonEmptyContents = contents.filter((content) => {
          const key = Object.keys(content)[0];
          return content[key].chapter_details.length > 0;
        });
  
        const randomContent =
          nonEmptyContents[Math.floor(Math.random() * nonEmptyContents.length)];
  
        const key = Object.keys(randomContent)[0];
        const randomContentItems = randomContent[key].chapter_details;
        const randomContentItem =
          randomContentItems[Math.floor(Math.random() * randomContentItems.length)];
        const randomContentTitle = randomContentItem.content_title;
        const randomContentDescription = randomContentItem.content_description;
  
        return {
          content_title: randomContentTitle,
          content_description: randomContentDescription,
        };
      };
  
      const getRandomValueBasedOnOrder = (order) => {
        const key = Object.keys(courseObj.contents[order])[0];
        const randomContentItems = courseObj.contents[order][key].chapter_details;
        const randomContentTitles = randomContentItems.map(
          (content) => content.content_title
        );
        const randomContentDescriptions = randomContentItems.map(
          (content) => content.content_description
        );
        const randomContentDetails = randomContentItems.map(
          (content) => content.content_detail
        );
        const randomContentLinks = randomContentItems.map(
          (content) => content.resource_link
        );
  
        const randomIndex = Math.floor(Math.random() * randomContentTitles.length);
        const randomContentTitle = randomContentTitles[randomIndex];
        const randomContentDescription = randomContentDescriptions[randomIndex];
        const randomContentDetail = randomContentDetails[randomIndex];
        const randomContentLink = randomContentLinks[randomIndex];
  
        return {
          content_title: randomContentTitle || "Enroll to view",
          content_description: randomContentDescription || "Enroll to view",
          content_detail: randomContentDetail || "Enroll to view",
          resource_link: randomContentLink || "Enroll to view",
        };
      };
  
      return {
        v_1: getRandomContentTitle(),
        v_2: getRandomValueBasedOnOrder(0),
        v_3: getRandomValueBasedOnOrder(1),
      };
    } catch (e) {
      return {
        v_1: {
          content_title: "Content not found",
          content_description: "Content not found",
          content_detail: "Content not found",
          resource_link: "Content not found",
        },
        v_2: {
          content_title: "Content not found",
          content_description: "Content not found",
          content_detail: "Content not found",
          resource_link: "Content not found",
        },
        v_3: {
          content_title: "Content not found",
          content_description: "Content not found",
          content_detail: "Content not found",
          resource_link: "Content not found",
        },
      };
    }
  };
  