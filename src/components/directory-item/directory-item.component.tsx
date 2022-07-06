import { FC } from "react";

import { useNavigate } from "react-router-dom";
import { DirectoryCategory } from "../directory/directory.component";

import {
  DirectorItemContainer,
  BackgroundImage,
  DirectoryItemBody,
} from "./directory-item.styles";

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
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
