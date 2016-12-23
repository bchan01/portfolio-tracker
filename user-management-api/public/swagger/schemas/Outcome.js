/**
 * @SwaggerDefinitions
 *   Outcome:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 *       errors:
 *         type: array
 *         items:
 *           $ref: "#/definitions/ReturnStatus"
 */
