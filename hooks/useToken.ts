import { useAtom } from 'jotai';
import { authAtom } from '../states/auth';

export default function UseToken() {
    const [token] = useAtom(authAtom);

    return { token };
}
