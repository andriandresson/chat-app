import React, { useCallback } from "react";
import styled from "styled-components";
import { useSocket } from "use-socketio";
import More from "../icons/More";
import { useDispatch } from "react-redux";
import { chatLeave } from "../actions/auth";
import { toggleMenu } from "../actions/menu";

const Wrapper = styled.div`
  padding: 25px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 980px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const OnlineWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const OnlineCircle = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  background: #60d15e;
  border-radius: 50%;
  margin-right: 10px;
`;

const OnlineText = styled.p`
  color: ${props => props.theme.subColor};
  font-size: 15px;
`;

const Header = () => {
  // Redux
  const dispatch = useDispatch();
  const chatLeaveAction = useCallback(() => {
    dispatch(chatLeave());
  }, [dispatch]);
  const toggleMenuAction = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  useSocket("leave", ({ username }) => {
    console.log(username + " left the chat");
    chatLeaveAction();
  });

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>Chat</Title>
          <OnlineWrapper>
            <OnlineCircle />
            <OnlineText>{"<number>"} online</OnlineText>
          </OnlineWrapper>
        </TitleWrapper>

        <button onClick={() => toggleMenuAction()}>
          <More />
        </button>
      </Container>
    </Wrapper>
  );
};

export default Header;
