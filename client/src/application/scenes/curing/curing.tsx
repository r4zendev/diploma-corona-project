import { Col, Layout, Row, Steps, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { CovidMap } from 'client/components';
import { useGeolocation } from '../../core';
const { Content } = Layout;
const { Title, Text, Paragraph, Link } = Typography;
const { Step } = Steps;

export function Curing() {
  const { position, country } = useGeolocation();
  const helpLinkBase = 'https://www.google.com/search?q=covid+help';

  const [getHelpHref, setGetHelpHref] = useState(helpLinkBase);

  useEffect(() => {
    if (country) {
      setGetHelpHref(helpLinkBase + '+' + country);
    }
  }, [country]);

  return (
    <Layout className="curing">
      <Content className="curing__content">
        <Title level={2} className="curing__content__title">
          Prevention and curing of COVID-19
        </Title>

        <Row gutter={16} className="curing__content__row">
          <Col span={12}>
            <Paragraph>
              <Title level={5}>
                The virus does not circulate in the air, but is transmitted from
                person to person
              </Title>
              <Text>
                The virus is unable to travel long distances. It is present only
                in drops that a person exhales when coughing or sneezing.
                Distance is a guarantee of safety. This is a factor in breaking
                the epidemic chain. Therefore, it is impossible to get infected
                even from an infected person if you are more than 2 m away.
              </Text>
            </Paragraph>
          </Col>
          <Col span={12}>
            <Title level={5}>The path of infection</Title>
            <Text>
              SARS-CoV-2 is transmitted by exposure to infectious respiratory
              fluids released during exhalation. This includes calm breathing,
              talking, singing, exercise, coughing, sneezing, and the more
              intense the breathing activity, the more particles are released in
              the form of drops. For practical purposes, drops can be divided
              into two categories: large drops, which settle from the air within
              a few seconds, and very small drops (now called aerosols), which
              can remain in the air for several minutes to hours.
            </Text>
          </Col>
        </Row>
        <Row gutter={16} className="curing__content__row">
          <Col span={12}>
            <Title level={5}>Ways to protect yourself</Title>
            <Text>
              So how can we protect ourselves? First of all, as everybody is
              concerned, nowadays lots of different vaccines have already been
              developed to fight against that dangerous disease. In fact, you
              right now can just walk to your closest vaccination center and get
              yourself one. This is the first and the most important step to
              prevent yourself from getting infected. Couple more useful advices
              are: looking after your well-being, doing exercices, getting
              enough sleep and just keeping your body in a good shape. In this
              case, human's immunity system works much better and therefore,
              lowers the chance of you being infected. Also, don't hesitate to
              visit doctor's in case you feel sick or suspect a touch of COVID's
              symptoms. Don't wait and just get to the hospital. Wash your hands
              every time you get home from the street, don't get your hands
              close to the face.
            </Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Curing and actions after first symptoms</Title>
            <Text>
              In case you already start to feel ill and some of COVID's symptoms
              are already starting to appear, your first steps would look like
              that:
              <Steps
                progressDot
                current={4}
                direction="vertical"
                style={{ marginTop: 8 }}
              >
                <Step
                  title="Isolate yourself"
                  description="Avoid contacting anyone who lives in your place or has a daily contact with you. Don't go to work or your education place."
                />
                <Step
                  title="Ventilate your room"
                  description="Make sure to get fresh air into your body every 2 hours or less."
                />
                <Step
                  title="Drink water"
                  description="You should drink enough water for your organism to get rid of sputums in your throat and nose."
                />
                <Step
                  title="Get to the doctor's"
                  description="In case of feeling really bad, get to the hospital, so that the specialists could measure your condition and prescribe you a correct treatment"
                />
              </Steps>
            </Text>
          </Col>
        </Row>
        <Link href={getHelpHref}>Get COVID-19 help </Link>
        <Text>
          (For the result to be more precise, you should allow the site to know
          your location)
        </Text>
        {position && <CovidMap position={position} />}
      </Content>
    </Layout>
  );
}
