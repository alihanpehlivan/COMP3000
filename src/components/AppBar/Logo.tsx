import Link from '@mui/material/Link';

export const Logo = () => {
  return (
    <Link
      noWrap
      sx={{ display: { xs: 'none', sm: 'block' } }}
      href="/app"
      variant="h6"
    >
      CriticEats
      <span aria-label="emoji" role="img">
        🍴
      </span>
    </Link>
  );
};
