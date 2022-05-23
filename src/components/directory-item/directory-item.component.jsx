import { useNavigate } from "react-router-dom";

import {
  DirectorItemContainer,
  BackgroundImage,
  DirectoryItemBody,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectorItemContainer onClick={onNavigateHandler}>
      {/* <img /> */}
      <BackgroundImage imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectorItemContainer>
  );
};

export default DirectoryItem;
