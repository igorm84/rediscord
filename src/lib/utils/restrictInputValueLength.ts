export default function restrictInputValueLength(
  e: React.ChangeEvent<HTMLInputElement>,
  maxLength: number,
) {
  if (e.target.value.length > maxLength) {
    e.target.value = e.target.value.slice(0, maxLength);
  }
}
