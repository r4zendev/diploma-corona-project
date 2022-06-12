import { Layout, Typography } from 'antd';
const { Content } = Layout;

const { Title, Paragraph } = Typography;

export function Info() {
  return (
    <Layout className="info">
      <Content className="info__content">
        <Title level={2} className="info__content__title">
          About COVID
        </Title>
        <Content className="info__content__main">
          <Paragraph className="info__content__description">
            Coronavirus disease (COVID-19) is an infectious disease caused by
            the SARS-CoV-2 virus.
          </Paragraph>
          <Paragraph className="info__content__description">
            Most people infected with the virus will experience mild to moderate
            respiratory illness and recover without requiring special treatment.
            However, some will become seriously ill and require medical
            attention. Older people and those with underlying medical conditions
            like cardiovascular disease, diabetes, chronic respiratory disease,
            or cancer are more likely to develop serious illness. Anyone can get
            sick with COVID-19 and become seriously ill or die at any age.
          </Paragraph>
          <Paragraph className="info__content__description">
            The best way to prevent and slow down transmission is to be well
            informed about the disease and how the virus spreads. Protect
            yourself and others from infection by staying at least 1 metre apart
            from others, wearing a properly fitted mask, and washing your hands
            or using an alcohol-based rub frequently. Get vaccinated when it's
            your turn and follow local guidance.
          </Paragraph>
          <Paragraph className="info__content__description">
            The virus can spread from an infected person's mouth or nose in
            small liquid particles when they cough, sneeze, speak, sing or
            breathe. These particles range from larger respiratory droplets to
            smaller aerosols. It is important to practice respiratory etiquette,
            for example by coughing into a flexed elbow, and to stay home and
            self-isolate until you recover if you feel unwell.
          </Paragraph>
          <iframe
            src="https://www.youtube.com/embed/OZcRD9fV7jo"
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            style={{ width: '100%', height: '500px' }}
          ></iframe>
          <Paragraph className="info__content__description">
            <iframe
              src="https://public.domo.com/cards/epNEr"
              width="40%"
              height="600"
              style={{ float: 'right' }}
            ></iframe>
            The first case of COVID-19 was reported Dec. 1, 2019, and the cause
            was a then-new coronavirus later named SARS-CoV-2. SARS-CoV-2 may
            have originated in an animal and changed (mutated) so it could cause
            illness in humans. In the past, several infectious disease outbreaks
            have been traced to viruses originating in birds, pigs, bats and
            other animals that mutated to become dangerous to humans. Research
            continues, and more study may reveal how and why the coronavirus
            evolved to cause pandemic disease.
          </Paragraph>
          <Paragraph className="info__content__description">
            The first case of COVID-19 was reported Dec. 1, 2019, and the cause
            was a then-new coronavirus later named SARS-CoV-2. SARS-CoV-2 may
            have originated in an animal and changed (mutated) so it could cause
            illness in humans. In the past, several infectious disease outbreaks
            have been traced to viruses originating in birds, pigs, bats and
            other animals that mutated to become dangerous to humans. Research
            continues, and more study may reveal how and why the coronavirus
            evolved to cause pandemic disease.
          </Paragraph>
          <Paragraph>
            Despite many vaccines already administered, COVID-19 still remains a
            very dangerous infection. It strikes different parts of human's
            body, but mainly aims on respiratory organs as they are the most
            comfortable for virus to exist in.
          </Paragraph>
        </Content>
      </Content>
    </Layout>
  );
}
