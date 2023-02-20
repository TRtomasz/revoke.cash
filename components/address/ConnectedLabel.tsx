import Label from 'components/common/Label';
import { useMounted } from 'lib/hooks/useMounted';
import { classNames } from 'lib/utils/styles';
import useTranslation from 'next-translate/useTranslation';
import { useAccount } from 'wagmi';

interface Props {
  address: string;
}

const ConnectedLabel = ({ address }: Props) => {
  const isMounted = useMounted();
  const { t } = useTranslation();
  const { address: account } = useAccount();

  if (!isMounted) return null;

  const classes = classNames(
    address === account ? 'bg-green-500 text-white' : 'bg-zinc-300 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-100'
  );

  return (
    <Label className={classes}>
      {address === account ? t('address:labels.connected') : t('address:labels.not_connected')}
    </Label>
  );
};

export default ConnectedLabel;
