export let buttonsList: ButtonsList[] = [
  {
    name: 'Platform Launch',
    class: 'SideNav__tab SideNav__tab--active',
    id: 1,
  }, {
    name: 'Marketing Plan',
    class: 'SideNav__tab',
    id: 2,
  },
  {
    name: ' Roadmap',
    class: 'SideNav__tab',
    id: 3,
  },

]

export interface ButtonsList {
  name: string
  class: string
  id: number
}
