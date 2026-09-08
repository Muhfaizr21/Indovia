// Admin (superadmin) stylesheet.
// Imported lazily so the admin SCSS chunk only loads for admin / auth pages,
// never leaking into landing pages. Mirrors LandingLayout's CSS injection.
import './app.scss';

const AdminStyles = () => null;
export default AdminStyles;
