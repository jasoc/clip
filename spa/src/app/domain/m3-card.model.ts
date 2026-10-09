export type M3CardAction = {
  icon: string;
  color?: 'primary' | 'accent' | 'warn';
  label: string;
  callback: () => void;
};
