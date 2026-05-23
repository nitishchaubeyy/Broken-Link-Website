import { IconCode, IconHeart, IconStar } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Box, Container, Text } from '@mantine/core'; 
import { useViewportSize } from '@mantine/hooks';
import { useNavigationLinks } from '@/components/Hooks/useNavigationLinks';
import { GITHUB_QUERY_KEY, GITHUB_STALE_TIME } from '@/constants/api.consts';
import { githubService } from '@/services/Github/githubService';
import { theme } from '@/theme';
import { useIsDark } from '../Hooks/useIsDark';
import { LinkButton, LinkTarget } from '../UI/Button/LinkButton';
import { Divider } from '../UI/Divider/Divider';
import { Link } from '../UI/Link/Link';
import { Typography } from '../UI/Typography/Typography';
import { footerStyles } from './styles';

export default function Footer() {
  const { externalLinks, footerQuickLinks, footerCommunityLinks } = useNavigationLinks();
  const { t } = useTranslation();
  const { width } = useViewportSize();
  const isMobileView = width < 1024;
  const isDark = useIsDark();

  const { data: starCount } = useQuery({
    queryKey: [GITHUB_QUERY_KEY],
    queryFn: githubService.fetchGithubStars,
    staleTime: GITHUB_STALE_TIME,
    retry: false,
  });

  return (
    <>
      <Divider />
      <Container style={footerStyles.container}>
        {/* TODO Resolved: Replaced mantine grid with styling from styles.ts */}
        <div style={footerStyles.topGrid(isMobileView)}>
          <Box>
            <Text
              inherit
              variant='gradient'
              component='span'
              gradient={footerStyles.gradientConfig}
              style={footerStyles.gradientText}
            >
              {t('footer.header')}
            </Text>
            <Typography style={footerStyles.text(isDark)}>{t('footer.about')}</Typography>
            <LinkButton
              href={externalLinks.GITHUB.REPO}
              target={LinkTarget.Blank}
              leftSection={
                <IconStar style={{ marginRight: theme.spacing.lg }} size={footerStyles.iconSize} />
              }
              variant='primary'
            >
              {`${t('footer.gitBtnTxt')}${starCount != null ? ` | ${starCount}` : ''}`}
            </LinkButton>
          </Box>

          <Box>
            <Typography style={footerStyles.header(isDark)}>{t('footer.QuickLinks')}</Typography>
            {footerQuickLinks.map((link, i) => (
              <Link key={i + link.label} href={link.href} label={link.label} />
            ))}
          </Box>

          <Box>
            <Typography style={footerStyles.header(isDark)}>{t('footer.Community')}</Typography>
            {footerCommunityLinks.map((link, i) => (
              <Link
                key={i + link.label}
                href={link.href}
                label={link.label}
                target={LinkTarget.Blank}
              />
            ))}
          </Box>
        </div>
      </Container>

      <Divider />

      <Container style={footerStyles.container}>
        <div style={footerStyles.bottomGrid(isMobileView)}>
          <Typography style={footerStyles.openSrcTxt(isMobileView, isDark)}>
            <IconCode size={footerStyles.iconSize} /> {t('footer.madeWith')}
            <IconHeart color={theme.colors.red[8]} size={footerStyles.iconSize} />
            {t('footer.byOpenSrc')}
          </Typography>
          <Typography style={footerStyles.rightsTxt(isMobileView, isDark)}>
            {t('footer.rights')}
          </Typography>
        </div>
      </Container>
    </>
  );
}