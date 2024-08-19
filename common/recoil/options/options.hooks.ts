import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { optionsAtom } from "./options.atoms";

export const useOptionsValue = () => {
  const options = useRecoilValue(optionsAtom);

  return options;
};

export const useOptions = () => {
  const options = useRecoilState(optionsAtom);

  return options;
};

export const useSetOptions = () => {
  const setOpitons = useSetRecoilState(optionsAtom);

  return setOpitons;
};
