import { useAtom } from 'jotai';
import { authAtom } from '../states/auth';

export default function useToken() {
    const [token] = useAtom(authAtom);

    return { token: `Bearer ${token}` };
}
