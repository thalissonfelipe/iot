import Header from '../../components/Header';
import FabIcon from '../../components/FabIcon';
import DashboardComponent from '../../components/Dashboard';

export default function Dashboard() {
    return (
        <>
            <FabIcon />
            <Header next='/recipients' previous='/' />
            <DashboardComponent />
        </>
    );
}
