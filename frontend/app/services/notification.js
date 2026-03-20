import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NotificationService extends Service {
  @tracked toasts = [];

  @action
  showToastMessageHandler(title, message, color) {
    const toast = {
      id: Date.now() + Math.random(), // Unique ID
      title,
      message,
      color,
      timestamp: Date.now(),
    };

    // Add to the beginning of array (newest on top)
    this.toasts = [toast, ...this.toasts];

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      this.dismissToast(toast.id);
    }, 6000);
  }

  @action
  dismissToast(toastId) {
    this.toasts = this.toasts.filter((toast) => toast.id !== toastId);
  }

  @action
  clearAllToasts() {
    this.toasts = [];
  }
}
