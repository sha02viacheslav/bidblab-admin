import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (10, 'Blab', null, null, 'question_answer', null, true, 0),
    new Menu (11, 'Questions', '/questions/list', null, 'live_help', null, false, 10),   
    new Menu (12, 'Tags', '/questions/tags', null, 'receipt', null, false, 10),   
    new Menu (13, 'Interests', '/questions/interests', null, 'favorite', null, false, 10),   
    new Menu (14, 'Answers', '/questions/answerslist', null, 'receipt', null, false, 10),   
    new Menu (20, 'Members', '/users/list', null, 'supervisor_account', null, false, 0),   
    new Menu (30, 'Credits', '/credits', null, 'score', null, false, 0),   
    new Menu (40, 'Flags', '/flags/flaglist', null, 'flag', null, false, 0),   
    new Menu (50, 'Bid', null, null, 'motorcycle', null, true, 0),   
    new Menu (51, 'Bid', '/bid/newauction', null, 'note_add', null, false, 50),    
    new Menu (52, 'Pending Auctions', '/bid/pendingauctions', null, 'open_in_browser', null, false, 50),   
    new Menu (53, 'Auctions in Progress', '/bid/progressauctions', null, 'lock_open', null, false, 50),   
    new Menu (54, 'Closed Auctions', '/bid/closedauctions', null, 'lock', null, false, 50), 
    new Menu (60, 'Mailbox', '/mailbox', null, 'email', null, false, 0),
    new Menu (70, 'Site Manager', null, null, 'settings', null, true, 0),
    new Menu (71, 'About', '/sitemanager/about', null, 'help', null, false, 70), 
    new Menu (72, 'How it works?', '/sitemanager/how', null, 'how_to_vote', null, false, 70), 
    new Menu (73, 'Terms of Service', '/sitemanager/terms', null, 'local_laundry_service', null, false, 70), 
    new Menu (74, 'Cookie Policy', '/sitemanager/cookie', null, 'local_activity', null, false, 70), 
    new Menu (75, 'Privacy Policy', '/sitemanager/privacy', null, 'security', null, false, 70), 
    new Menu (76, 'Investor Relations', '/sitemanager/investor', null, 'recent_actors', null, false, 70), 
]

export const horizontalMenuItems = []