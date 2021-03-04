import Header from '../../components/Header';
import Dashboard from '../../components/Dashboard';

export default function Home() {
    return (
        <>
            <Header previous='/recipients' next='/ingredients' />
            <Dashboard />
        </>
    );
}
