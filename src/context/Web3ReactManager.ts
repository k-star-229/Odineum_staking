import {useEagerConnect} from '../hooks/useEagerConnect';
import {useInactiveListener} from '../hooks/useInactiveListener';

export default function Web3ReactManager({children}:any) {
  const  tried:boolean = useEagerConnect();
  useInactiveListener(!tried);
  return children;
}
