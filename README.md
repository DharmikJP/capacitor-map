# mapbox-techo

Native mapbox sdk for capacitor

## Install

```bash
npm install mapbox-techo
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`create(...)`](#create)
* [`close()`](#close)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### create(...)

```typescript
create(options: { accessToken: string; width: number; height: number; x: number; y: number; latitude?: number; longitude?: number; zoom?: number; liteMode?: boolean; }) => Promise<any>
```

Creates map view and displays it

| Param         | Type                                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ accessToken: string; width: number; height: number; x: number; y: number; latitude?: number; longitude?: number; zoom?: number; liteMode?: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### close()

```typescript
close() => Promise<any>
```

Destroy the mapView, use in ionViewDidLeave and similar

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------

</docgen-api>
