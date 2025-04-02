import * as Malloy from '@malloydata/malloy-interfaces';
export interface MalloyPreviewProps {
    source: Malloy.SourceInfo;
    query?: Malloy.Query;
}
export declare function MalloyPreview({ source, query }: MalloyPreviewProps): import("react/jsx-runtime").JSX.Element | null;
