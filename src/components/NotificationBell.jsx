import { useState, useEffect } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import io from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import customAPI from '../api.js';

const socket = io(import.meta.env.VITE_MODE === "development" ? "http://localhost:5000" : import.meta.env.VITE_API_URL);

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const { data } = await customAPI.get('/notifications');
      setNotifications(data.data);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Gagal mengambil notifikasi:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on('newNotification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  const handleDropdownToggle = async (isOpen) => {
    setShowDropdown(isOpen);
    if (isOpen && unreadCount > 0) {
      try {
        await customAPI.put('/notifications/read');
        setUnreadCount(0);
      } catch (error) {
        console.error("Gagal menandai notifikasi sebagai dibaca:", error);
      }
    }
  };

  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  return (
    <Dropdown show={showDropdown} onToggle={handleDropdownToggle} className="fm-2">
      <Dropdown.Toggle variant="dark" id="dropdown-notifications" className="border-0 bg-transparent position-relative">
        <i className="ri-notification-3-line fs-5"></i>
        {unreadCount > 0 && (
          <Badge pill bg="danger" className="position-absolute top-0 end-0 translate-middle"
            style={{ fontSize: '0.6em' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="dropdown-menu-dark" style={{ minWidth: '350px' }}>
        <Dropdown.Header>Notifikasi</Dropdown.Header>
        {notifications.length === 0 ? (
          <Dropdown.ItemText>Tidak ada notifikasi baru</Dropdown.ItemText>
        ) : (
          notifications.map((notif, index) => {
            const linkTo = notif.type === 'newUser'
              ? `/admin/customers/${notif._id}/edit`
              : `/admin/orders/${notif._id}`;

            return (
              <Link
                to={linkTo}
                key={index}
                className="text-decoration-none"
                onClick={handleLinkClick}
              >
                <Dropdown.Item as="div" className="d-flex gap-2 py-2">
                  <i className={`${notif.type === 'newUser' ? 'ri-user-add-line' : 'ri-shopping-cart-line'} text-light mt-1`}></i>
                  <div>
                    <p className="m-0 text-wrap" style={{ fontSize: '0.9em' }}>{notif.message}</p>
                    <small className="text-white">
                      {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: id })}
                    </small>
                  </div>
                </Dropdown.Item>
              </Link>
            );
          })
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;