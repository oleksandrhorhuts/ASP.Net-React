import React from 'react';
import {
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderWrapLaptop = styled(Stack)({
  width: '100%',
  height: 72,
  backgroundColor: '#293055',
  justifyContent: 'center',
});

const StyledButton = styled(Button)({
  color: 'white',
  width: '50%',
  textTransform: 'capitalize',
});

const StyledLink = styled(Button)({
  color: 'white',
  textTransform: 'capitalize'
});

const HeaderLaptop = ({
  itemModalOpen,
  connectModalOpen,
}: {
  itemModalOpen: () => void
  connectModalOpen: () => void
}) => {
  return (
    <HeaderWrapLaptop>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{
          md: "row",
          xs: "column"
        }}
        px={5}
        py={2}
        height={72}
      >
        <Stack
          gap={1}
          flexDirection="row"
          display={{
            md: 'flex',
            xs: 'none'
          }}
        >
          <StyledLink href="/">
            Предмети
          </StyledLink>
          <StyledLink href="/accounts">
            Сметководство
          </StyledLink>
          <StyledLink href="/carriers">
            Поврзаници
          </StyledLink>
          <StyledLink href="/customers">
            Коминтенти
          </StyledLink>
          <StyledLink href="/users">
            Корисници
          </StyledLink>
          <StyledLink href="/">
            Акции на корисници
          </StyledLink>
        </Stack>
        <Stack
          gap={1}
          justifyContent={{
            md: "end",
            xs: "center"
          }}
          flexDirection="row"
          sx={{
            width: {
              lg: '40%',
              md: '30%',
              xs: '100%'
            }
          }}
        >
          <StyledButton
            sx={{
              backgroundColor: '#4277FF',
              '&:hover': {
                backgroundColor: '#4277FF',
                opacity: 0.8
              }
            }}
            onClick={() => itemModalOpen()}
          >
            Нов Предмет
          </StyledButton>
          <StyledButton
            sx={{
              backgroundColor: '#3BBE6F',
              '&:hover': {
                backgroundColor: '#3BBE6F',
                opacity: 0.8
              }
            }}
            onClick={() => connectModalOpen()}
          >
            Соедини
          </StyledButton>
        </Stack>
      </Stack>
    </HeaderWrapLaptop>
  );
}

export default HeaderLaptop;