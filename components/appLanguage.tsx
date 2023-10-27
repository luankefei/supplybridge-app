import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const languages: {lang: string; flag: string}[] = [
  {
    lang: 'en',
    flag: '/flags/gb.svg',
  },
  {
    lang: 'de',
    flag: '/flags/de.svg',
  },
  {
    lang: 'zh-CN',
    flag: '/flags/cn.svg',
  },
]

export const AppLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  const onChangeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const flag: string = useMemo(() => {
    if (i18n.language === 'de') {
      return '/flags/de.svg'
    }
    if (i18n.language === 'zh-CN') {
      return '/flags/cn.svg'
    }

    return '/flags/gb.svg'
  }, [i18n.language])

  return (
    <LanguageContainer>
      <SelectedLanguage className="selected-language">
        <Image
          src={flag}
          alt={i18n.language}
          width={20}
          height={20}
        />
      </SelectedLanguage>
      <LanguagesContainer className="languages">
        {languages.sort(l => l.lang === i18n.language ? -1 : 1).map((lng) => (
          <LanguageItem key={lng.lang} onClick={() => onChangeLanguage(lng.lang)}>
            <Image
              src={lng.flag}
              alt={lng.lang}
              width={20}
              height={20}
            />
          </LanguageItem>
        ))}
      </LanguagesContainer>
    </LanguageContainer>
  )
};

export default AppLanguage;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 10% 0;
`;

const LanguageContainer = styled.div`
  position: relative;
  cursor: pointer;
  height: 36px;
  width: max-content;
  align-self: center;


  &:hover {
    & > div.languages {
      transform: skew(0deg, 0deg);
      opacity: 1;
      display: flex;
      flex-direction: column;
      z-index: 10;
    }
  }
`;

const SelectedLanguage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem 1rem;
  position: relative;
  z-index: 11;
`;

const LanguagesContainer = styled.div`
  transform: skew(-10deg, 0deg);
  transition: opacity .3s ease-in-out, display .2s ease-in-out, transform .2s ease-in-out;
  transition-delay: .1s;
  opacity: 0;
  position: absolute;
  transform-origin: 100% 0;
  top: 0;
  left: 0%;
  right: auto;
  overflow: hidden;
  box-shadow: 0 3px 11px -1px rgba(64, 73, 255, .11);
  border-radius: .25rem;
  background-color: #FFFFFF;
  z-index: -1;
`;

const LanguageItem = styled.a`
  display: flex;  
  align-items: center;
  justify-content: center;
  padding: .5rem 1rem;
  text-decoration: none;
  background-color: #FFFFFF;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: #F3F4F6;
  }

  &:first-child {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;
