// TODO this hack is used because jsdom does not mock Notification API
// see https://github.com/jsdom/jsdom/issues/1862
window.Notification = {
	permission: 'granted'
}
