import React from "react";
import styled from "styled-components";

export default function Sidebar() {
  const array = [1, 2, 3, 4, 5];

  return (
    <Wrapper>
      {array.map((element) => {
        return (
          <PageGroup key={element}>
            <div> {element} </div>
            <File>+</File>
          </PageGroup>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  background-color: #f9f5f2;
`;

const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 168px;
  border: 1px dotted black;
  background-color: white;
`;

const PageGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
`;
