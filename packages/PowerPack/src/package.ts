/* Do not change these import lines. Datagrok will import API library in exactly the same manner */
import * as grok from 'datagrok-api/grok';
import * as ui from 'datagrok-api/ui';
import * as DG from 'datagrok-api/dg';
import { welcomeView } from "./welcome-view";
import { compareColumns } from './compare-columns';
import { AddNewColumnDialog } from './dialogs/add-new-column';
import { DistributionProfilerViewer } from './distribution-profiler';
import { UsageWidget } from "./widgets/usage-widget";
import { SystemStatusWidget } from "./widgets/system-status-widget";
import { RecentProjectsWidget } from "./widgets/recent-projects-widget";
import { CommunityWidget } from './widgets/community-widget';
import { WebWidget } from './widgets/web-widget';
import { LearningWidget } from "./widgets/learning-widget";
import { AboutWidget } from "./widgets/about-widget";
import { functionSearch, pdbSearch, pubChemSearch, scriptsSearch, usersSearch, wikiSearch } from './search/entity-search';
import { KpiWidget } from "./widgets/kpi-widget";
import { HtmlWidget } from "./widgets/html-widget";
import {PowerPackSettingsEditor} from "./settings-editor";

export let _package = new DG.Package();

//name: compareColumns
//top-menu: Data | Compare Columns...
export function _compareColumns(): void {
  compareColumns();
}

//name: addNewColumn
//input: funccall call {optional: true}
//editor-for: AddNewColumn
export function addNewColumnDialog(call: DG.FuncCall | null = null): AddNewColumnDialog {
  return new AddNewColumnDialog(call);
}

//name: distributionProfiler
//tags: viewer
//output: viewer result
export function _distributionProfiler(): DistributionProfilerViewer {
  return new DistributionProfilerViewer();
}

//name: welcomeView
//tags: autostart
export function _welcomeView(): void {
  welcomeView();
}

//output: widget result
//tags: dashboard
export function systemStatusWidget(): DG.Widget {
  return new SystemStatusWidget();
}

//output: widget result
//tags: dashboard
export function usageWidget(): DG.Widget {
  return new UsageWidget();
}

//output: widget result
//tags: dashboard
export function recentProjectsWidget(): DG.Widget {
  return new RecentProjectsWidget();
}

//output: widget result
//tags: dashboard
export function communityWidget(): DG.Widget {
  return new CommunityWidget();
}

//output: widget result
export function webWidget(): DG.Widget {
  return new WebWidget();
}

//output: widget result
export function htmlWidget(): DG.Widget {
  return new HtmlWidget();
}

//output: widget result
//tags: dashboard
export function learnWidget(): DG.Widget {
  return new LearningWidget();
}

//output: widget about
//tags: dashboard
export function aboutWidget(): DG.Widget {
  return new AboutWidget();
}

//output: widget kpi
export function kpiWidget(): DG.Widget {
  return new KpiWidget();
}

//output: widget kpi
//tags: packageSettingsEditor
export function powerPackSettingsEditor(): DG.Widget {
  return new PowerPackSettingsEditor();
}

//description: Functions
//tags: search
//input: string s
//output: list result
export function _functionSearch(s: string): Promise<any[]> {
  return functionSearch(s);
}

//description: Scripts
//tags: search
//input: string s
//output: list result
export function _scriptsSearch(s: string): Promise<any[]> {
  return scriptsSearch(s);
}

//description: Users
//tags: search
//input: string s
//output: list result
export function _usersSearch(s: string): Promise<any[]> {
  return usersSearch(s);
}

//description: Protein Data Bank
//tags: search
//input: string s
//output: widget
export function _pdbSearch(s: string): Promise<any> {
  return pdbSearch(s);
}

//description: PubChem
//tags: search
//input: string s
//output: widget
export function _pubChemSearch(s: string): Promise<any> {
  return pubChemSearch(s);
}

//description: PubChem
//tags: search
//input: string s
//output: widget
export function _wikiSearch(s: string): Promise<any> {
  return wikiSearch(s);
}
