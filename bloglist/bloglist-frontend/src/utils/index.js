export const removeReset = (withReset) => {
  const withoutReset = {
    'value': withReset.value,
    'type': withReset.type,
    'onChange': withReset.onChange
  }
  return( withoutReset )
}