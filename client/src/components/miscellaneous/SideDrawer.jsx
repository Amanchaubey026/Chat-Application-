import { FaSearch } from "react-icons/fa";
import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={'5px 10px 5px 10px'}
        borderWidth={'5px'}
      >
        <Tooltip
          label="Search Users to chat with"
          hasArrow
          placement="bottom-end"
        >
          <Button variant={"ghost"}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;
