import { Col, Text } from 'react-quick-style-components';

function App() {
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Col
        width200
        height200
        backgroundColor="black"
        onHoverStyle={{
          backgroundColor: 'pink'
        }}
        middle
        useNestedHover
        onResponsiveStyle={{
          xs: {
            width: 200,
            height: 200,
          },
          md: {
            width: 400,
            height: 400,
          }
        }}
      >
        <Text
          color="pink"
          onHoverStyle={{
            color: 'black'
          }}
        >
          Hello World
        </Text>
      </Col>
    </div>
  );
}

export default App;
