import Button from '@/_ui/Button';

export const RundomNumberGenerator = ({ onChange, meta }) => {
  const generateRandomValue = () => onChange(Math.random());

  return (
    <Button className="btn-sm" onClick={generateRandomValue}>
      {meta.buttonText}
    </Button>
  );
};
