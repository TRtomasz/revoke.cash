import Button from 'components/common/Button';
import useTranslation from 'next-translate/useTranslation';
import { useAsyncCallback } from 'react-async-hook';
import { useAccount, useSwitchNetwork } from 'wagmi';

interface Props {
  chainId: number;
}

const SwitchChainButton = ({ chainId }: Props) => {
  const { t } = useTranslation();
  const { connector } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const canSwitchChain = connector?.id === 'injected';

  const { execute, loading } = useAsyncCallback(() => switchNetwork(chainId));

  const button = (
    <Button style="secondary" size="sm" disabled={!canSwitchChain} loading={loading} onClick={execute}>
      {loading ? t('common:buttons.switching') : t('common:buttons.switch_chain')}
    </Button>
  );

  return button;
};

export default SwitchChainButton;
