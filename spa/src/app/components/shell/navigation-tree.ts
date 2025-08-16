export class NavigationElement {
  public subElements: NavigationElement[] = [];
  public name: string = '';
  public icon: string = '';
  public redirect: string = '';
  public rippled: boolean = false;
  public isExpanded: boolean = false;
  public type: 'button' | 'tag' = 'button';
  public constructor(init?: Partial<NavigationElement>) {
    Object.assign(this, init);
  }
}

export const navigationElementsTree: NavigationElement[] = [
  new NavigationElement({
    name: 'Home',
    icon: 'token',
    redirect: 'home',
    subElements: [
      new NavigationElement({
        name: 'Overview',
        icon: 'navigate_next',
        redirect: 'home',
      }),
      new NavigationElement({
        name: 'About',
        icon: 'info',
        redirect: 'home/about',
      }),
    ],
  }),
  new NavigationElement({
    type: 'tag',
    name: 'Clip',
    icon: 'token',
  }),
  new NavigationElement({
    name: 'Dashboards',
    icon: 'dataset',
    subElements: [
      new NavigationElement({
        name: 'Overview',
        icon: 'navigate_next',
        redirect: 'dashboards',
      }),
      new NavigationElement({
        name: 'All dashboards',
        icon: 'wysiwyg',
        redirect: 'dashboards/all',
      }),
      new NavigationElement({
        name: 'New dashboard',
        icon: 'add_circle',
        redirect: 'dashboards/composer',
      }),
    ],
  }),
  new NavigationElement({
    name: 'Settings',
    icon: 'settings',
    subElements: [
      new NavigationElement({
        name: 'Overview',
        icon: 'navigate_next',
        redirect: 'settings',
      }),
      new NavigationElement({
        name: 'Personal settings',
        icon: 'settings_account_box',
        redirect: 'settings/personal',
      }),
      new NavigationElement({
        type: 'tag',
        name: 'Admin',
      }),
      new NavigationElement({
        name: 'Admin settings',
        icon: 'admin',
        redirect: 'settings/admin ',
      }),
    ],
  }),
  new NavigationElement({
    type: 'tag',
    name: 'Automation',
  }),
  new NavigationElement({
    name: 'Virtual Assistant',
    icon: 'psychology',
    redirect: 'vms',
  }),
  new NavigationElement({
    type: 'tag',
    name: 'System',
  }),
  new NavigationElement({
    name: 'Virtual Machines',
    icon: 'computer',
    redirect: 'vms',
  }),
  new NavigationElement({
    name: 'Kubernetes',
    icon: 'directions_boat',
    subElements: [
      new NavigationElement({
        name: 'Overview',
        icon: 'navigate_next',
        redirect: 'home',
      }),
      new NavigationElement({
        type: 'tag',
        name: 'Workloads',
      }),
      new NavigationElement({
        name: 'Pods',
        icon: 'wysiwyg',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'Deployment',
        icon: 'add_circle',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'Services',
        icon: 'layers',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'ReplicaSet',
        icon: 'view_module',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'StatefulSet',
        icon: 'storage',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'DaemonSet',
        icon: 'settings_input_component',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'Job',
        icon: 'work',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'Secret',
        icon: 'vpn_key',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        name: 'ConfigMap',
        icon: 'map',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        type: 'tag',
        name: 'Network',
      }),
      new NavigationElement({
        name: 'Ingress',
        icon: 'call_split',
        redirect: 'dashboards/composer',
      }),
      new NavigationElement({
        type: 'tag',
        name: 'Storage',
      }),
      new NavigationElement({
        name: 'Volume',
        icon: 'folder',
        redirect: 'dashboards/composer',
      }),
    ],
  }),
];
