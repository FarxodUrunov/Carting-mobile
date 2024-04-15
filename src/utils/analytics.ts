const trackClient = {
  screen: (name: string, properties?: any) => {
    console.log("trackClient.screen", name, properties);
  },
  track: (event: string, properties?: any) => {
    console.log("trackClient.track", event, properties);
  },
  identify: (userId: any, properties?: any) => {
    console.log("trackClient.identify", userId, properties);
  },
  group: (event: string, properties?: any) => {
    console.log("trackClient.group", event, properties);
  },
  alias: (newUserId: string) => {
    console.log("trackClient.alias", newUserId);
  },
  reset: () => {
    console.log("trackClient.reset");
  },
  flush: () => {
    console.log("trackClient.flush");
  },
};

export function trackScreen(name: string, properties?: any) {
  trackClient.screen(name, properties);
}

export function trackEvent(event: string, properties?: any) {
  trackClient.track(event, properties);
}

export function trackIdentify(userId: any, properties?: any) {
  trackClient.identify(userId, properties);
}

export function trackGroup(event: string, properties?: any) {
  trackClient.group(event, properties);
}

export function trackAlias(newUserId: string) {
  trackClient.alias(newUserId);
}

export function trackReset() {
  trackClient.reset();
}

export function trackFlush() {
  trackClient.flush();
}

export default {
  trackScreen,
  trackEvent,
  trackIdentify,
  trackGroup,
  trackAlias,
  trackReset,
  trackFlush,
};
