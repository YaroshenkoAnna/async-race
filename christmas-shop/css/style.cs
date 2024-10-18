:root {
  --Primary: #ff4646;
  --Primary-10: rgba(255, 70, 70, 0.1);
  --Dark: #181c29;
  --Static-White: #fff;
  --Static-White-40: rgba(255, 255, 255, 0.4);
  --Static-White-20: rgba(255, 255, 255, 0.2);
  --Tag-Purple: #4361ff;
  --Tag-Pink: #ff43f7;
  --Tag-Green: #06a44f;
}

@font-face {
  font-family: "Montserrat";
  src: url("../fonts/Montserrat-VariableFont_wght.ttf");
}
@font-face {
  font-family: "Allura";
  src: url("../fonts/Allura-Regular.ttf");
}
.container {
  border-radius: 20px;
  overflow: hidden;
  background-color: var(--Primary);
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #ecf3f8;
  color: var(--Dark);
}
.card__image {
  width: 310px;
  height: 230px;
}
.card__container {
  box-sizing: border-box;
  width: 310px;
  height: 112px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 20px;
  padding: 20px;
  background-color: var(--Static-White);
}
.card__category {
  font-size: 12px;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.6px;
  text-transform: uppercase;
}
.card__category_work {
  color: var(--Tag-Purple);
}
.card__category_harmony {
  color: var(--Tag-Pink);
}
.card__category_health {
  color: var(--Tag-Green);
}
.card__title {
  font-size: 16px;
  line-height: 152%; /* 24.32px */
  letter-spacing: 1.28px;
  text-transform: uppercase;
}

.header {
  padding: 12px clamp(8px, 11.012vw - 76.573px, 82px);
  background-color: var(--Static-White);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 5%;
  text-transform: uppercase;
  color: var(--Dark);
}
.header__logo {
  padding: 8px 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
.header__logo-image {
  width: 24px;
  height: 24px;
}

.navigation__list {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.navigation__item {
  padding: 12px 20px;
  border-radius: 12px;
  list-style: none;
}
.navigation__item :active {
  background-color: var(--Primary-10);
  color: var(--Primary);
}
.navigation__link {
  text-decoration: none;
  color: inherit;
}

@media (hover: hover) and (pointer: fine) {
  .navigation__item:hover {
    background-color: var(--Primary-10);
    color: var(--Primary);
  }
}
.page {
  max-width: 1440px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  color: var(--Static-White);
  margin: auto;
}

.section {
  background-image: url("../images/bg-snow.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px clamp(8px, 8.929vw - 60.578px, 68px);
}
.section_hero {
  background-image: url("../images/bg-ball.png"), url("../images/bg-snow.png");
  height: 524px;
  box-sizing: border-box;
}
.section_about {
  color: var(--Dark);
}
.section_cta {
  background-image: url("../images/bg-forest.png"), url("../images/bg-snow.png");
}
.section_cta .section__content {
  text-align: center;
}
.section__content {
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.section__content_sm-gap {
  gap: 12px;
}
.section__content_padding60 {
  padding: 60px 0;
}
.section__caption {
  font-family: "Allura";
  font-size: 24px;
  font-weight: 400;
  line-height: 100%; /* 24px */
  letter-spacing: 1.2px;
}
.section__caption_primary {
  align-self: flex-start;
  color: var(--Primary);
}
.section__title {
  max-width: 426px;
  font-size: 24px;
  line-height: 152%; /* 36.48px */
  letter-spacing: 3.84px;
  text-transform: uppercase;
}
.section__title_main {
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  letter-spacing: 5.76px;
}
.section__button {
  padding: 20px 32px;
  background-color: var(--Dark);
  font-size: 12px;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.6px;
  text-transform: uppercase;
  border-radius: 20px;
  color: var(--Static-White);
}
.section__wraper {
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  background-color: var(--Static-White);
  overflow: hidden;
}
.section__content-wraper {
  background-color: var(--Static-White);
  padding: 0 60px;
  display: flex;
  align-items: center;
}
.section__description {
  font-size: 16px;
  font-weight: 400;
  line-height: 148%;
  max-width: 426px;
}
.section__image {
  border-radius: 20px;
}
.section__title-wraper {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.section__slider {
  align-self: flex-start;
}
.section__gallery {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 1276px;
}

@media only screen and (max-width: 1439px) {
  .section__gallery {
    max-width: 632px;
  }
}
.slider__wraper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  align-self: flex-start;
}
.slider__text {
  font-size: 80px;
  line-height: normal;
  text-transform: uppercase;
}
.slider__image {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}
.slider__arrows {
  position: relative;
  left: clamp(5px, 100vw - (8.929vw - 60.578px) * 2 - 132px, 1162px);
  margin-top: 20px;
  display: inline-flex;
  flex-direction: row;
  gap: 20px;
  align-self: flex-end;
}
.slider__arrow {
  stroke: var(--Static-White-40);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 20px;
  border: 1px solid var(--Static-White-40);
}
.slider__arrow_active {
  stroke: var(--Static-White);
  border-color: var(--Static-White);
}
.slider__arrow svg {
  stroke: inherit;
}

@media only screen and (max-width: 768px) {
  .slider__arrows {
    left: clamp(5px, 100vw - 132px - 16px, 1162px);
  }
}
.timer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.timer__time {
  padding: 8px 12px;
  display: flex;
  background-color: var(--Static-White-40);
  border-radius: 20px;
}
.timer__section {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80px;
}
.timer__section:not(:first-child)::after {
  position: absolute;
  top: 15px;
  content: "";
  width: 1px;
  height: 20px;
  background-color: var(--Static-White);
}
.timer__number {
  text-align: center;
  font-size: 24px;
  line-height: 152%; /* 36.48px */
  letter-spacing: 3.84px;
  text-transform: uppercase;
}
.timer__text {
  text-align: center;
  font-size: 12px;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

html {
  scroll-behavior: smooth;
}

/*# sourceMappingURL=style.cs.map */
