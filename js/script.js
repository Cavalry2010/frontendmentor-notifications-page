"use strict";

class NotificationsApp {
  markAllReadBtn = document.querySelector(".btn-mark-as-read");
  notificationsList = document.querySelector(".notifications-box");
  unreadNotifications = document.querySelector(".unread-notifications");
  unreadQty = 0;

  constructor() {
    this.assignUnread();
    this.notificationsList.addEventListener("click", (e) =>
      this.markAsRead(e, false)
    );
    this.markAllReadBtn.addEventListener("click", (e) =>
      this.markAsRead(e, true)
    );
  }

  assignUnread() {
    const list = Array.from(this.notificationsList.children);
    list.forEach((child) => {
      if (child.classList.contains("notification--unread")) {
        this.unreadQty++;
      }
    });
    this.unreadNotifications.textContent = this.unreadQty;
  }

  markAsRead(e, all) {
    const target =
      e.target.tagName === "UL" ? e.target : e.target.closest(".notification");
    if (
      !all &&
      target.tagName === "LI" &&
      target.classList.contains("notification--unread")
    ) {
      target.classList.remove("notification--unread");
      this.unreadQty--;
      this.reduceQty();
    }
    if (all) {
      const list = Array.from(this.notificationsList.children);
      list.forEach((child) => {
        child.classList.remove("notification--unread");
      });
      this.unreadQty = 0;
      this.reduceQty();
    }
  }

  reduceQty() {
    if (this.unreadQty !== 0) {
      this.unreadNotifications.textContent = this.unreadQty;
    } else {
      this.unreadNotifications.classList.add("hidden");
    }
  }
}

const notifications = new NotificationsApp();
